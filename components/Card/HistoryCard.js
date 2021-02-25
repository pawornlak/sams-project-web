import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Circle from "../../Image/circle.png";
import Filter from "../Filter/ActivityFilter";
import Join from "../../Image/add1.png";
import Unjoin from "../../Image/add2.png";
import Fav from "../../Image/heart1.png";
import Unfav from "../../Image/heart2.png";
import Day from "../../Image/date.png";
import Time from "../../Image/clock.png";
import Location from "../../Image/location.png";
import Members from "../../Image/members.png";
import Closed from "../../Image/closed.png";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Link from "next/link";

import Chest from "../../Image/chest.jpg";
import MainPageSlidebar from "../Slidebar/MainPageSlidebar";
import Moment from "react-moment";
import "moment-timezone";

const QUERY_MYFAV = gql`
  query {
    getOneUser {
      name
      joins{
        _id
        name
        status
        dateStart
        dateEnd
        timeStart
        timeEnd
        place
        participantsNumber
        dateCloseApply
      }
    }
  }
`;

const HistoryCard = () => {
  const { data } = useQuery(QUERY_MYFAV, {
    pollInterval: 3000,
  });
  console.log(data);
  //console.log(result.data.getAllPostsByAuthen.posts)

  const [toggleJoin, setToggleJoin] = useState("unjoin");
  console.log("Join>>", toggleJoin);
  const [toggleFav, setToggleFav] = useState("unfav");
  console.log("Fav>>", toggleFav);

  const handleClickJoin = () => {
    if (toggleJoin == "unjoin") {
      setToggleJoin("join");
    }
    if (toggleJoin == "join") {
      setToggleJoin("unjoin");
    }
  };

  const handleClickFav = () => {
    if (toggleFav == "unfav") {
      setToggleFav("fav");
    }
    if (toggleFav == "fav") {
      setToggleFav("unfav");
    }
  };
  return (
    <div className="My-Hist-Page-Card-Div">
      {/* <div className="My-Hist-Page-Fixed-Bg">
        <nav className="My-Hist-Page-Card-Nav">
          <p className="My-Hist-Page-Card-Nav-Popular">ชื่นชอบ</p>
        </nav>
      </div> */}
      <div className="My-Hist-Page-Card-List">
      {data && (
          <>
            {/* {data.getAllPostsByAuthen.posts.map((prod) => (
              <div key={prod._id}>
                <h4>{prod.name}</h4>
              </div>
            ))} */}
            {data.getOneUser.joins.map((prod) => (
              <div key={prod._id}>
                <Card className="My-Hist-Page-Card">
                  <div className="My-Hist-Page-Card-Area">
                    <div className="My-Hist-Page-Card-Flex">
                      <div className="My-Hist-Page-Card-Left">
                        <Link
                          key={prod._id}
                          href="/activity/[activityId]"
                          as={`/activity/${prod._id}`}
                        >
                          <img className="My-Hist-Page-Card-Img" src={Chest} />
                        </Link>
                        {/* <label className="My-Hist-Page-Card-Status">
                          สถานะกิจกรรม :
                        </label>
                        <label className="My-Hist-Page-Card-Status"> {prod.status} </label> */}
                      </div>
                      <div className="My-Hist-Page-Card-Right">
                        <label className="My-Hist-Page-Card-Name">
                          {prod.name}
                        </label>
                        <div className="My-Hist-Page-Card-Date-Time">
                          <label className="My-Hist-Page-Card-Date">
                            <img
                              className="My-Hist-Page-Card-Icon-Size"
                              src={Day}
                            />

                            <Moment format="D MMM YYYY">
                              {prod.dateStart}
                            </Moment>
                          </label>
                          <label className="My-Hist-Page-Card-Time">
                            <img
                              className="My-Hist-Page-Card-Icon-Size"
                              src={Time}
                            />
                            {prod.timeStart} น.
                          </label>
                        </div>

                        <label className="My-Hist-Page-Card-Location">
                          <img
                            className="My-Hist-Page-Card-Icon-Size"
                            src={Location}
                          />
                          {prod.place}
                        </label>
                        {/* <div className="My-Hist-Page-Card-Members-Close">
                          <label className="My-Hist-Page-Card-Members">
                            <img
                              className="My-Hist-Page-Card-Icon-Size"
                              src={Members}
                            />
                             {prod.participantsNumber}
                          </label>
                          <label className="My-Hist-Page-Card-Close">
                            <img
                              className="My-Hist-Page-Card-Icon-Size"
                              src={Closed}
                            />
                            {prod.dateCloseApply}
                          </label>
                        </div> */}
                      </div>
                    </div>
                  </div>
                  {/* <CardActions>
                    <div className="My-Hist-Page-Card-More-Div">
                      <Link
                        key={prod._id}
                        href="/activity/[activityId]"
                        as={`/activity/${prod._id}`}
                      >
                        <button className="My-Hist-Page-Card-More">
                          <a>รายละเอียดเพิ่มเติม >></a>
                        </button>
                      </Link>
                    </div>
                  </CardActions> */}
                </Card>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default HistoryCard;
