import {useLocation, useSearchParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import multiSearch from "../api";
export default function Search() {
  const location = useLocation();
  // keyword 값만 사용하고 싶으면 search를 파싱해서 사용해야함.
  // 쿼리가 여러개 있을 때는 파싱하기 까다로움
  // console.log(location); // {pathname: '/search', search: '?keyword=hello', hash: '', state: null, key: '2dfd6la8'}

  // 해결방법 1: 리액트 라우터의 useSearchParams 사용
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");

  // 해결방법2: Header.tsx에서 페이지 이동할 떄 state 전달
  // navigate(`/search?keyword=${data.keyword}`, { state: { keyword: data.keyword } });
  // 단점: url로 새창에서 열면 state가 없어서 에러가 뜸
  // const keyword = location.state.keyword;

  const { data, isPending } = useQuery({
    queryKey: ["searchResults"],
    queryFn: () => multiSearch(keyword),
  });

  console.log(data)

  return (
    <>
      <div>
        {
          isPending ?
          <p>loading...</p> :
          <div>
            {
              data.results.map((r: any) => (
                <>
                  <p key={r.id}>{r.original_name ? r.original_name : r.original_title}</p>
                </>
              ))
            }
          </div>
        }
      </div>
    </>
  );
}