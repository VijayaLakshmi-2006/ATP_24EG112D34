function User(props){
    const {userObj}=props
    return(
        <div className="shadow-2xl rounded-2xl ">
            <img className="mx-auto rounded-full" src={userObj.image} alt="" />
            <p className="text-center">{userObj.name}</p>
            <p className="text-center">{userObj.email}</p>
        </div>
    )
}
export default User