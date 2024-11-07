import {useQuery} from "@tanstack/react-query";
import {getMovies, IGetMoviesResult} from "../api";
import styled from "styled-components";
import {makeImagePath} from "../utils";
import {AnimatePresence, motion} from "framer-motion";
import {useState} from "react";
import useWindowDimensions from "../hooks/useWidowDimensions";
import {useMatch, useNavigate} from "react-router-dom";

const Wrapper = styled.div`
    background-color: #000;
    overflow: hidden;
`;

const Loader = styled.div`
    height: 20vh;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Banner = styled.div<{bgPhoto: string}>`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 60px;
    background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${props => props.bgPhoto});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
`;

const Title = styled.h2`
    font-size: 68px;
    margin-bottom: 20px;
`;

const Overview = styled.p`
    font-size: 30px;
    width: 50%;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
`;

const Slider = styled.div`
    position: relative;
    height: 200px;
    top: -100px;
`;

const Row = styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 5px;
    margin-bottom: 10px;
    position: absolute;
    width: 100%;
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
    background-color: #fff;
    height: 200px;
    color: #fff;
    font-size: 1rem;
    background-image: url(${props => props.bgPhoto});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    
    // 맨 왼쪽, 맨 오른쪽 포스터이미지가 커졌을 때 잘리지 않도록
    &:first-child {
        transform-origin: left;
    }
    
    &:last-child {
        transform-origin: right;
    }
`;

const Info = styled(motion.div)`
    padding: 10px;
    background-color: ${props => props.theme.black.lighter};
    opacity: 0;
    position: absolute;
    width: 100%;
    bottom: 0;
    
    h4 {
        text-align: center;
        font-size: 18px;
    }
`;

const Overlay = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0;
`;

const BigMovie = styled(motion.div)`
    width: 40vw;
    height: 80vh;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    background-color: ${props => props.theme.black.darker};
    overflow: hidden;
    border-radius: 15px;
`;

const BigCover = styled.div`
    width: 100%;
    height: 400px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
`;

const BigTitle = styled.h2`
    color: ${props => props.theme.white.lighter};
    font-size: 28px;
    transform: translateY(-2em);
    padding: 0 20px;
`;

const BigOverview = styled.p`
    color: ${props => props.theme.white.lighter};
    padding: 0 20px;
    transform: translateY(-2em);
`;

const boxVariants = {
  normal: {
    scale: 1
  },
  hover: {
    scale: 1.3,
    y: -50,
    transition: {
      duration: 0.3,
      delay: 0.5
    }
  }
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      duration: 0.3,
      delay: 0.5
    }
  }
};

const offset = 6; // 한번에 보여주고 싶은 영화 수

export default function Home() {
  const navigate = useNavigate();
  const bigMovieMatch = useMatch("/movies/:movieId");
  const width = useWindowDimensions();
  const { data, isPending: isLoading } = useQuery<IGetMoviesResult>({
    queryKey: ["movies"],
    queryFn: getMovies
  });
  const [index, setIndex] = useState(0);

  // 버튼을 빨리 누르면 슬라이드가 이상하게 되는 문제를 해결하기 위한 상태
  // 버튼 두번 클릭했을 때 원래 있던 row가 사라지기 전에 새 row도 사라지려고 함
  const [leaving, setLeaving] = useState(false);

  const increaseIndex = () => {
    if (data) {
      if (leaving) {
        return;
      }

      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1; // index가 0부터 시작하기 때문에
      setIndex(prev => prev === maxIndex ? 0 : prev + 1);
    }
  };

  const toggleLeaving = () => setLeaving(prev => !prev);

  const onBoxClicked = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };

  const onOverlayClick = () => {
    navigate("/");
  };

  const clickedMovie = bigMovieMatch?.params.movieId && data?.results.find(movie => String(movie.id) === bigMovieMatch?.params.movieId);

  return (
    <Wrapper>
      { isLoading ?
        <Loader>Loading...</Loader> :
        <>
          <Banner bgPhoto={ makeImagePath(data?.results[0].backdrop_path || "") } onClick={increaseIndex}>
            <Title>{ data?.results[0].title }</Title>
            <Overview>{ data?.results[0].overview }</Overview>
          </Banner>
          <Slider>
            {/*AnimatePresence에 initial={false}을 추가하면 맨처음에는 initial 애니메이션이 적용되지 않는다*/}
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                key={index}
                initial={{ x: width + 5 }}
                animate={{ x: 0 }}
                exit={{ x: -width - 5 }}
                transition={{
                  type: "tween",
                  duration: 1
                }}
              >
                {
                  data?.results.slice(1).slice(offset * index, offset * index + offset).map(movie => (
                    <Box
                      layoutId={movie.id + ""}
                      key={movie.id}
                      variants={boxVariants}
                      initial="normal"
                      whileHover="hover"
                      transition={{ type: "tween" }}
                      bgPhoto={ makeImagePath(movie.backdrop_path, "w500") }
                      onClick={ () => onBoxClicked(movie.id) }
                    >
                      <Info variants={infoVariants}>
                        <h4>{movie.title}</h4>
                      </Info>
                    </Box>
                  ))
                }
              </Row>
            </AnimatePresence>
          </Slider>
          <AnimatePresence>
            {
              bigMovieMatch ? (
                <>
                  <Overlay
                    onClick={onOverlayClick}
                    animate={{
                      opacity: 1
                    }}
                    exit={{
                      opacity: 0
                    }}
                  />
                  <BigMovie layoutId={bigMovieMatch.params.movieId} >
                    {
                      clickedMovie && (
                        <>
                          <BigCover
                            style={{
                              backgroundImage: `linear-gradient(transparent, black), url(${makeImagePath(clickedMovie.backdrop_path, "w500")}`
                            }} />
                          <BigTitle>{ clickedMovie.title }</BigTitle>
                          <BigOverview>{ clickedMovie.overview }</BigOverview>
                        </>
                      )
                    }
                  </BigMovie>
                </>
              ) :
                null
            }
          </AnimatePresence>
        </>
      }
    </Wrapper>
  );
}