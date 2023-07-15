import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config";


export type IResponse = {
    isSuccess: boolean;
    response: object
}

export const registerUser = async (username: string, email: string, password: string): Promise<IResponse> => {
    const response: IResponse ={
        isSuccess: false,
        response: {}
    }

    await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            response.isSuccess = true;
            response.response = user
        })
        .catch((error) => {
            const statusCode = error.code;
            const errorMessage = error.message;

            response.isSuccess = false;
            response.response = {code: statusCode, message: errorMessage}
        });

    return response;
}

export const loginUser = async (email: string, password: string): Promise<IResponse> => {
    const response: IResponse ={
        isSuccess: false,
        response: {}
    }

    await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            
            response.isSuccess = true;
            response.response = user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            response.isSuccess = false;
            response.response = { code: errorCode, message: errorMessage}
        });

    return response;
}