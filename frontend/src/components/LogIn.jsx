import React from "react";
import { Button, Form } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import makeRequest from "../utils/apiCall";
import TokenChecker from "../hooks/tokenChecker";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { setTokenToLocalStorage } = TokenChecker()

    // Handle form submit
    const onSubmit = async (data) => {
        // Call login api;
        console.log(data)
        const { username, password } = data
        console.log("+++++++++++++++++++++", process.env.REACT_APP_INTERNAL_SERVER_BASE_URL)
        const apiResponse = await makeRequest('POST', `${process.env.REACT_APP_INTERNAL_SERVER_BASE_URL}auth/login`, { userName: username, password });

        if (apiResponse && apiResponse.status === 200) {
            setTokenToLocalStorage(apiResponse.data.token)
            // Navigate to product page
            navigate("/product")
        }
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Controller
                    name="username"
                    control={control}
                    rules={{ required: "Username is required" }}
                    render={({ field }) => (
                        <Form.Control
                            {...field}
                            type="text"
                            placeholder="Enter your username"
                            isInvalid={!!errors.username}
                        />
                    )}
                />
                {errors.username && (
                    <Form.Control.Feedback type="invalid">
                        {errors.username.message}
                    </Form.Control.Feedback>
                )}
            </Form.Group>

            <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Controller
                    name="password"
                    control={control}
                    rules={{ required: "Password is required" }}
                    render={({ field }) => (
                        <Form.Control
                            {...field}
                            type="password"
                            placeholder="Enter your password"
                            isInvalid={!!errors.password}
                        />
                    )}
                />
                {errors.password && (
                    <Form.Control.Feedback type="invalid">
                        {errors.password.message}
                    </Form.Control.Feedback>
                )}
            </Form.Group>

            <Button variant="success" type="submit" className="px-3 my-3">
                LogIn
            </Button>
        </Form>
    );
}

