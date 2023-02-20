import axios from "axios";

//Register User
export const saveUser = async (data: string[]) => {
    const [email, username, password, confirmPassword, carrerName] = data;
    if (!email || !username || !password || !confirmPassword || !carrerName) {
        return "Por favor rellene todos los campos"
    };

    if (password !== confirmPassword) {
        return "Las contraseñas no coinciden"
    };
    try {
        const response = await axios.post('http://localhost:3000/users/save', {
            email,
            username,
            password,
            carrerName
        });
        return response.data;
    } catch (error: any) {
        return (error.response.data.message);
    };

};

//Login user
export const loginUser = async (data: string[]) => {
    const [username, password] = data;
    if (!username || !password) {
        return "Por favor rellene todos los campos"
    };
    try {
        const response = await axios.post("http://localhost:3000/users/login", {
            username,
            password
        });
        return response.data;
    } catch (error: any) {
        return (error.response.data.message);
    }
};

//Get all Carreers
export const getCareers = async () => {
    const response = await axios.get("http://localhost:3000/careers")
    return response.data;
};