import axios from "axios";
import { useQuery } from "react-query";

const fetchUserByEmail = (email) => {
    return axios.get(`http://localhost:4000/users/${email}`);
};
const fetchCoursesByChannelId = (id) => {
    return axios.get(`http://localhost:4000/channels/${id}`);
};
const DependentQueriesPage = ({ email }) => {
    const { data: user } = useQuery(["user", email], () =>
        fetchUserByEmail(email)
    );
    const chaneelId = user?.data?.channelId;
    const { data: channel } = useQuery(
        ["channel", chaneelId],
        () => fetchCoursesByChannelId(chaneelId),
        {
            enabled: !!chaneelId,
        }
    );
    return <div>{JSON.stringify(channel?.data)}</div>;
};

export default DependentQueriesPage;
