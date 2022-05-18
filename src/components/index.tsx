import React, { useState } from "react";
import "../App.css";
import { logout, signIn } from "../redux/actions/studentAction";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";

function LoginStudent() {
  const [loginName, setLoginName] = useState({ names: "" });
  const [loading, setLoading] = useState(false);

  const { userAuth, students } = useSelector(
    (state: RootState) => state.studentAuth
  );
  const dispatch: AppDispatch = useDispatch();

  const handleLoginChange = (e: React.FormEvent<HTMLInputElement>) => {
    let { name, value } = e.currentTarget;

    setLoginName((values) => ({
      ...values,
      [name]: value,
    }));

    console.log("value", value);
  };

  const userLogin = async () => {
    const { names } = loginName;
    let payload = names;

    setLoading(true);

    try {
      let dispatchedLogger = signIn(payload);
      await dispatchedLogger(dispatch);
      setLoading(false);
      //console.log("loginName", loginName);
      //console.log("user", user.id);
    } catch (error: any) {
      setLoading(false);
      console.error(error);
    }
  };

  const userLogout = () => {
    logout();
    localStorage.clear();
    window.location.pathname = "/";
  };
  // const mapped = user.map((userName: any) => {
  //   return <div key={userName.id}>{userName.fields.Name} </div>;
  // });

  return (
    <>
      {userAuth ? (
        <div>
          <button type="submit" onClick={userLogout}>
            Logout
          </button>

          <div className="user-box">
            <div className="user-inner-box">
              {students.map((student: any, idx: any) => (
                <div className="classes-card" key={idx}>
                  <div className="card-content">
                    <div>Class: {student[0]}</div>
                    <br />
                    <div>
                      Students: <div>{student[1].join("\n")}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>{" "}
          </div>
        </div>
      ) : (
        <div className="box">
          <div className="inner-box">
            <label>Student Name</label>

            <input
              type="text"
              onChange={handleLoginChange}
              id="name"
              name="names"
              autoComplete="name"
              value={loginName.names}
            />

            {loading ? (
              <button disabled type="button">
                Loading...
              </button>
            ) : (
              <button onClick={userLogin} type="button">
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default LoginStudent;
