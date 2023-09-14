import { Button, Checkbox, Form, Input } from "antd";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { addDoc, getDocs, query, where } from "firebase/firestore";
import { FcGoogle } from "react-icons/fc";
import { firebaseAuth, userRef } from "../utils/FirebaseConfig";
import { useAppDispatch } from "../app/hooks";
import { setEmailUser, setToast } from "../app/slices/AppSlice";
import { useState } from "react";

const Login = () => {
  const dispatch = useAppDispatch();
  const [isNewMember, setIsNewMember] = useState(false);
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
    confirmPassword?: string;
  };
  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const {
        user: { email, uid },
      } = await signInWithPopup(firebaseAuth, provider);

      if (email) {
        const firestoreQuery = query(userRef, where("uid", "==", uid));
        const fetchedUser = await getDocs(firestoreQuery);
        if (fetchedUser.docs.length === 0) {
          await addDoc(userRef, { uid, email });
        }
      }
      dispatch(setEmailUser({ email, uid }));
      dispatch(setToast("Login success !!!"));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container flex login">
      <div className="signin-image">
        <img
          src="https://colorlib.com/etc/regform/colorlib-regform-7/images/signin-image.jpg"
          alt=""
        />
      </div>
      {!isNewMember && (
        <div className="sign-up">
          <h2>Sign up</h2>
          <div>
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item<FieldType>
                label="Username"
                name="username"
                labelAlign="left"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item<FieldType>
                label="Password"
                name="password"
                labelAlign="left"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item<FieldType>
                name="remember"
                valuePropName="checked"
                wrapperCol={{ offset: 8, span: 16 }}
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Log in
                </Button>
              </Form.Item>
            </Form>
            <h2 onClick={() => setIsNewMember(true)}>Create account</h2>
          </div>
          <h4>Or login with</h4>
          <div className="login-by-gmail">
            <button className="login-btn" onClick={handleLogin}>
              <FcGoogle />
              Login with Google
            </button>
          </div>
        </div>
      )}
      {isNewMember && (
        <div className="sign-up">
          <h2>Sign up</h2>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              label="Username"
              name="username"
              labelAlign="left"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Password"
              name="password"
              labelAlign="left"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item<FieldType>
              label="Reset password"
              name="confirmPassword"
              labelAlign="left"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item<FieldType>
              name="remember"
              valuePropName="checked"
              wrapperCol={{ offset: 8, span: 16 }}
            >
              <Checkbox>I agree all statements in Terms of service</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Form>
          <h2 onClick={() => setIsNewMember(false)}>Are you have account ?</h2>
        </div>
      )}
    </div>
  );
};

export default Login;
