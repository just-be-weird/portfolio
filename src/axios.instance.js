import axios from "axios";
export default axios.create({
    baseURL: "https://asia-east2-notebook-portfolio.cloudfunctions.net/api",
    orgin: true,
    headers: {
        "Content-Type": "application/json",
    },
});
