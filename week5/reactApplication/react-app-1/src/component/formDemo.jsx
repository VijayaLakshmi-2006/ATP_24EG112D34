
import { useForm } from "react-hook-form";

function FormDemo() {
  const {
    register,                  //to register form fields
    handleSubmit,              //to handle for submission
    formState: { errors },     //to handle validation
  } = useForm();


  // form submit function
  const onFormSubmit = (obj) => {
    console.log(obj);
  };

  return (
    <div>
      <h1 className="text-center text-5xl">Form Demo</h1>

      {/* form */}
      <form
        className="max-w-md mx-auto mt-10"
        onSubmit={handleSubmit(onFormSubmit)}
      >
        <div className="mb-3">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            {...register("username",
                {
                    required:"Username required",
                    validate:(v)=>v.trim().length!==0||"valid kadhu anta"
                   // minLength:4
                })}
            id="username"
            className="border w-full p-3"
          />
          {errors.username?.type==="required"&&<p className="text-red-800 text-2xl">peru kavali anta </p>}
           {errors.username?.type==="minLength"&&<p className="text-red-800 text-2xl">min of length 4 characters </p>}
        </div>

        <div className="mb-3">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            {...register("email", {
                    required:"mail required",
                   
                })}
            id="email"
            className="border w-full p-3"
          />           {errors.username?.type==="required"&&<p className="text-red-800 text-2xl">mail iyyi</p>}
        </div>

        <button type="submit" className="p-4 block bg-amber-300 text-center mx-auto">
          kottu
        </button>
      </form>
    </div>
  );
}

export default FormDemo;