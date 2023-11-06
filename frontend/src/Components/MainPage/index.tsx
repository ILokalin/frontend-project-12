import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Wrapper from "../Wrapper";
import { request } from "../../utils/request";
import ROUTES from "../../apiConfig";
import { useAuth } from "../../providers/AuthProvider";
import { addChannels } from "../../slices/channels";
import Channels from "../Channels";

const MainPage = () => {
  const auth = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const config = { headers: auth.getAuthHeader() };
      const response = await request(ROUTES.DATA_API, config);
      dispatch(addChannels(response));
    };
    fetchData();
  }, [auth]);

  return (
    <Wrapper>
      <div className="row h-100 bg-white flex-md-row">
        <Channels />
        <div className="col p-0 h-100"></div>
      </div>
    </Wrapper>
  );
};

export default MainPage;
