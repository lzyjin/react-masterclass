import {useForm} from "react-hook-form";

// React Hook Form 사용
interface IForm {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  password1: string;
  extraError?: string;
}

export default function ToDoList() {
  const { register, handleSubmit, formState: {errors}, setError } = useForm<IForm>({defaultValues: {
    email: "@naver.com",
      firstName: "홍길동"
    }});

  const onValid = (data: IForm) => {
    if(data.password !== data.password1) {
      setError(
        "password1",
        { message: "Password are not the same." },
        { shouldFocus: true } // 애러가 생긴 곳으로 커서가 이동함
      );
    }

    // 전체 form에 해당되는 에러
    // setError("extraError", { message: "Server offline." });
  };

  console.log(errors)

  return (
    <div>
      <form style={{display: "flex", flexDirection: "column"}} onSubmit={handleSubmit(onValid)}>
        <input {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[A-Za-z0-9._%+-]+@naver.com$/,
            message: "Only naver.com emails allowed"
          }
        })} type="text" placeholder="Email"/>
        <span>{errors?.email?.message?.toString()}</span>

        <input {...register("firstName", {required: "write here", validate: {
          // async () => {} 로 비동기로 만들어서 서버에 확인하고 응답을 받을 수도 있다
          noNico: (value) => value.includes("nico") ? "no nico allowed" : true,
            noNick: (value) => value.includes("nick") ? "no nick allowed" : true,
          } })} type="text" placeholder="First Name"/>
        <span>{errors?.firstName?.message?.toString()}</span>

        <input {...register("lastName", {required: "write here"})} type="text" placeholder="Last Name"/>
        <span>{errors?.lastName?.message?.toString()}</span>

        <input {...register("username", {required: "write here", minLength: 10})} type="text" placeholder="Username"/>
        <span>{errors?.username?.message?.toString()}</span>

        <input {...register("password", {required: "write here", minLength: 5})} type="text" placeholder="Password"/>
        <span>{errors?.password?.message?.toString()}</span>

        <input {...register("password1", {
          required: "Password is required.", minLength: {
            value: 5,
            message: "Your password is too short."
          }
        })} type="text" placeholder="Password1"/>
        <span>{errors?.password1?.message?.toString()}</span>

        <button>Add</button>
        { errors?.extraError?.message?.toString() }
      </form>
    </div>
  );
}

/*
export default function ToDoList() {
  const [toDo, setToDo] = useState("");
  const [toDoError, setToDoError] = useState("");

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: {value}
    } = e;
    setToDoError("");
    setToDo(value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(toDo.length < 10) {
      return setToDoError("To do should be longer.");
    }

    console.log("submit");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={toDo} onChange={onChange} type="text" placeholder="Write a to do" />
        <button>Add</button>
        {
          toDoError !== "" ? toDoError : ""
        }
      </form>
    </div>
  );
}
 */