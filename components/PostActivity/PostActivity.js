import React, { useState, Children, createContext, useContext } from "react";
import { useMutation } from "@apollo/react-hooks";
import Router from "next/router";
import TextField from '@material-ui/core/TextField';
import gql from "graphql-tag";

import CreateAct from "../../Image/create.png"
import ImageLogo from "../../Image/img.png"
import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const CREATEPOST = gql`
mutation CREATEPOST(
    $photoHeader: Upload, 
    $name: String!, 
    $dateStart: Date!, 
    $dateEnd: Date!, 
    $timeStart: String!, 
    $timeEnd: String!, 
    $place: String!, 
    $participantsNumber: Number!, 
    $dateCloseApply: Date!, 
    $major: String!, 
    $description: String
    )
{
    createPost(input:{
        photoHeader: $photoHeader, 
        name: $name, 
        dateStart: $dateStart, 
        dateEnd: $dateEnd , 
        timeStart: $timeStart ,
        timeEnd: $timeEnd, 
        place: $place, 
        participantsNumber: $participantsNumber, 
        dateCloseApply: $dateCloseApply, 
        major: $major, 
        description: $description })
    {
        name
    }
}
`;
// Set Radio
function useRadioButtons(name) {
    const [value, setState] = useState(null);

    const handleChange = (event) => {
        RadioGroup
        setState(event.target.value);
    };

    const inputProps = {
        onChange: handleChange,
        name,
        type: "radio"
    };

    return [value, inputProps];
}

const RadioGroupContext = createContext();

function RadioGroup({ children, name, onChange }) {
    const [state, inputProps] = useRadioButtons(name);
    return (
        <RadioGroupContext.Provider value={inputProps}>
            {children}
        </RadioGroupContext.Provider>
    );
}

function RadioButton(props) {
    const context = useContext(RadioGroupContext);
    return (
        <label>
            <input {...props} {...context} />
            {props.label}
        </label>
    );
}

const post = () => {
    const [userInfo, setUserInfo] = useState({
        // photoHeader: "",
        name: "",
        dateStart: "",
        dateEnd: "",
        timeStart: "00:00",
        timeEnd: "00:00",
        place: "",
        participantsNumber: "",
        dateCloseApply: "",
        major: "",
        description: "",
    });

    const dateFormat = require("dateformat");
    dateFormat.i18n = {
        dayNames: [
            "อา.",
            "จ.",
            "อ.",
            "พ.",
            "พฤ.",
            "ศ.",
            "ส.",
            "อา.",
            "จ.",
            "อ.",
            "พ.",
            "พฤ.",
            "ศ.",
            "ส.",
        ],
        monthNames: [
            "ม.ค.",
            "ก.พ.",
            "มี.ค.",
            "เม.ย.",
            "พ.ค.",
            "มิ.ย.",
            "ก.ค.",
            "ส.ค.",
            "ก.ย.",
            "ต.ค.",
            "พ.ย.",
            "ธ.ค.",
            "ม.ค.",
            "ก.พ.",
            "มี.ค.",
            "เม.ย.",
            "พ.ค.",
            "มิ.ย.",
            "ก.ค.",
            "ส.ค.",
            "ก.ย.",
            "ต.ค.",
            "พ.ย.",
            "ธ.ค.",
        ],
        timeNames: ["a", "p", "am", "pm", "A", "P", "AM", "PM"],
    };

    // const [post, { loading, error }] = useMutation(CREATEPOST, {
    //     variables: { ...userInfo },
    //     //เมื่อสำเร็จแล้วจะส่ง data เอามาใช้ได้
    //     onCompleted: (data) => {
    //         if (data) {
    //             console.log('dataaaaaaaaaaa');
    //             setUserInfo({
    //                 photoHeader: "",
    //                 name: "",
    //                 dateStart: "",
    //                 dateEnd: "",
    //                 timeStart: "",
    //                 timeEnd: "",
    //                 place: "",
    //                 participantsNumber: "",
    //                 dateCloseApply: "",
    //                 major: "",
    //                 description: "",
    //             });
    //             Router.push("/activity")
    //         }
    //     },
    // });

    const [post, { loading, error }] = useMutation(CREATEPOST);

    const handleChange = e => {
        console.log("Value", e.target.value)
        console.log(userInfo)

        setUserInfo({
            ...userInfo,

            [e.target.name]: e.target.value
        })
    }
    console.log("value2", userInfo)

    // const handleSubmit = async e => {
    //     console.log("handle submit")
    //     try {
    //         console.log("Doneeeeeeeeeee1")
    //         e.preventDefault();
    //         console.log("Doneeeeeeeeeee2")
    //         await post();
    //         console.log("Doneeeeeeeeeee3")
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };


    // const handleSubmit = async e => {
    //     console.log("handle submit")
    //     try {
    //         console.log("Doneeeeeeeeeee1")
    //         e.preventDefault();
    //         console.log("Doneeeeeeeeeee2")
    //         await post();
    //         console.log("Doneeeeeeeeeee3")
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    //image
    const [posterImg, setposterImg] = useState();
    const [picture, setPicture] = useState(null);
    const [imgData, setImgData] = useState(null);
    const [baseImage, setbaseImage] = useState("");

    // const onChangePicture = e => {
    //     if (e.target.files[0]) {
    //         console.log("picture: ", e.target.files);
    //         setPicture(e.target.files[0]);
    //         const reader = new FileReader();
    //         reader.addEventListener("load", () => {
    //             setImgData(reader.result);
    //         });
    //         userInfo.photoHeader = e.target.files[0].name
    //         reader.readAsDataURL(e.target.files[0]);
    //     }

    // };

    // const uploadImage = async (e) => {
    //     console.log('img:' + e.target.files[0].size)
    //     const file = e.target.files[0]
    //     const base64 = await convertBase64(file)
    //     // console.log(base64)
    //     setbaseImage(base64)
    //     userInfo.photoHeader = base64
    // }

    // const convertBase64 = (file) => {
    //     return new Promise((resolve, reject) => {
    //         const fileReader = new FileReader();
    //         fileReader.readAsDataURL(file)

    //         fileReader.onload = () => {
    //             resolve(fileReader.result)
    //         };

    //         fileReader.onerror = (error) => {
    //             reject(error);
    //         };
    //     })
    // }
    // const picOnchange = e => {
    //     const file = e.target.files[0]
    //     const storageRef = app.storage().ref()
    //     const fileRef = storageRef.child(file.name)
    // }

    // Set Drop down and radio
    const [show, setCreateShow] = useState(false);
    const handleCreateClose = () => setCreateShow(false);
    const handleCreateShow = () => setCreateShow(true);

    const [major, setMajor] = useState(null);
    const [status, setStatus] = useState(null)
    const [radio, setRadio] = useState(null);
    const [NumofPerson, setNumofPerson] = useState(null);

    const onChangePic = ({
        target: {
            files: photoHeader
        }
    }) => {
        setposterImg(photoHeader);
        console.log(photoHeader);
        // console.log(file[0].name);
        if (photoHeader[0]) {
            console.log("picture: ", photoHeader[0]);
            setPicture(photoHeader[0]);
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                setImgData(reader.result);
            });
            // userInfo.photoHeader = e.target.files[0].name
            reader.readAsDataURL(photoHeader[0]);
        }
    }

    const handleSubmit = ({
        target: {
            // validity,
            files: photoHeader
        }
    }) => {
        photoHeader = posterImg,
            console.log(photoHeader),
            console.log(posterImg),
            // validity.valid &&
            post({
                variables: { ...userInfo, photoHeader },
                onCompleted: (data) => {
                    if (data) {
                        console.log('dataaaaaaaaaaa');
                        setUserInfo({
                            // photoHeader: "",
                            name: "",
                            dateStart: "",
                            dateEnd: "",
                            timeStart: "",
                            timeEnd: "",
                            place: "",
                            participantsNumber: "",
                            dateCloseApply: "",
                            major: "",
                            description: "",
                        });
                    }
                },
            }),
            Router.push("/activity")
            console.log('post Done    plsssssssssss')
        console.log(userInfo)
    }


    return (
        <div className="Post-Page" >
            <form className="Post-Page" >
                <nav className="Post-Toggle-Button-Menu active">
                    <ul className="Post-Toggle-Button-Items">
                        <label>
                            <img src={CreateAct} id="Post-Logo"></img>
                        </label>
                        <label >สร้างกิจกรรมใหม่</label>
                    </ul>
                </nav>
                <hr></hr>


                <div className="Post-poster-container" >
                    <div className="previewProfilePic center">

                        <img className="post_image" src={imgData} />

                    </div>
                    <form onChange={onChangePic}>
                        <input
                            type="file"
                            name="photoHeader"
                            id="file"
                            accept=".jpeg, .png, .jpg"
                            className="Post-choseimage"
                        />
                    </form>
                </div>

                <div className="Post-Input-Container" >
                    <div className="row">
                        <div className="Post-Column Post-Input">
                            <h2>ชื่อกิจกรรม</h2>
                        </div>
                        <div className="Post-Column2 Post-Input">
                            <input type="text" name="name" className="Post-Input-Fill-Data" required onChange={handleChange} value={userInfo.name} />
                        </div>
                    </div>

                    <div className="row">
                        <div className="Post-Column Post-Input">
                            <h2>วันที่จัดกิจกรรม</h2>
                        </div>
                        <div className="Post-Column2 Post-Input">
                            <div className="Post-Flex-Row">
                                <form noValidate className="Post-Calendar-Time">
                                    <input type="date" name="dateStart" className="Post-Input-Fill-Data" InputLabelProps={{ shrink: true, }} data-date-format="MM-DD-YYY" required onChange={handleChange} value={userInfo.dateStart} />
                                </form>
                                <h2 className="Post-Calendar-Time Post-Input">ถึง</h2>
                                <form noValidate className="Post-Calendar">
                                    <input type="date" name="dateEnd" className="Post-Input-Fill-Data" InputLabelProps={{ shrink: true, }} data-date-format="MM-DD-YYY" required onChange={handleChange} value={userInfo.dateEnd} />
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="row Post-Input">
                        <div className="Post-Column Post-Input">
                            <h2>เวลาที่จัดกิจกรรม</h2>
                        </div>
                        <div className="Post-Column2 Post-Input">
                            <div className="Post-Flex-Row">
                                <form className="Post-Calendar-Time Post-Time">
                                    <input type="time" name="timeStart" className="Post-Input-Fill-Data" required onChange={handleChange} value={userInfo.timeStart} />
                                </form>

                                <h2 className="Post-Calendar-Time Post-Input">ถึง</h2>
                                <form className="Post-Calendar-Time">
                                    <input type="time" name="timeEnd" className="Post-Input-Fill-Data" required onChange={handleChange} value={userInfo.timeEnd} />
                                </form>

                            </div>
                        </div>

                    </div>

                    <div className="row">
                        <div className="Post-Column Post-Input">
                            <h2>สถานที่จัดกิจกรรม</h2>
                        </div>

                        <div className="Post-Column2 Post-Input">
                            <input type="text" name="place" className="Post-Input-Fill-Data" placeholder="" required onChange={handleChange} value={userInfo.place} />
                        </div>
                    </div>

                    <div className="row">
                        <div className="Post-Column Post-Input" >
                            <h2>จำนวนที่เปิดรับ</h2>
                        </div>
                        <div className="Post-Column2 Post-Input">
                            <div className="Post-Flex-Row Post-margin-top " onChange={(e) => { setRadio(e.target.value) }} onChange={handleChange} value={radio}>

                                <input type="number" name="participantsNumber" className="Post-Input-Small-Fill-Data Post-Input-Fill-Data" onChange={handleChange} value={userInfo.participantsNumber} />

                            </div>
                            <h2>คน</h2>
                        </div>
                    </div>

                    <div className="row">
                        <div className="Post-Column Post-Input">
                            <h2>วันที่ปิดรับสมัคร</h2>
                        </div>
                        <div className="Post-Column2 Post-Input">
                            <div className="Post-Flex-Row">
                                <input type="datetime-local" name="dateCloseApply" className="Post-Input-Fill-Data" InputLabelProps={{ shrink: true, }} data-date-format="MM-DD-YYY" required onChange={handleChange} value={userInfo.dateCloseApply} />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="Post-Column Post-Input">
                            <h2>คณะ/วิทยาลัย</h2>
                        </div>
                        <div className="Post-Column2 Post-Input" required onChange={handleChange} value={major}>
                            <select className="Post-Input-Fill-Data" name="major" onChange={(e) => { setMajor(e.target.value) }} value={major}>
                                <option value="ไม่ระบุ">เลือกคณะ/วิทยาลัย</option>
                                <option value="คณะวิศวกรรมศาสตร์">คณะวิศวกรรมศาสตร์</option>
                                <option value="คณะสถาปัตยกรรมศาสตร์">คณะสถาปัตยกรรมศาสตร์</option>
                                <option value="คณะครุศาสตร์อุตสาหกรรมและเทคโนโลยี">คณะครุศาสตร์อุตสาหกรรมและเทคโนโลยี</option>
                                <option value="คณะวิทยาศาสตร์">คณะวิทยาศาสตร์</option>
                                <option value="คณะเทคโนโลยีการเกษตร">คณะเทคโนโลยีการเกษตร </option>
                                <option value="คณะเทคโนโลยีสารสนเทศ">คณะเทคโนโลยีสารสนเทศ</option>
                                <option value="คณะการบริหารและการจัดการ">คณะการบริหารและการจัดการ</option>
                                <option value="คณะศิลปศาสตร์">คณะศิลปศาสตร์</option>
                                <option value="คณะแพทยศาสตร์">คณะแพทยศาสตร์</option>
                                <option value="วิทยาลัยนาโนเทคโนโลยีพระจอมเกล้าลาดกระบัง">วิทยาลัยนาโนเทคโนโลยีพระจอมเกล้าลาดกระบัง</option>
                                <option value="วิทยาลัยนวัตกรรมการผลิตขั้นสูง">วิทยาลัยนวัตกรรมการผลิตขั้นสูง</option>
                                <option value="วิทยาลัยอุตสาหกรรมการบินนานาชาติ">วิทยาลัยอุตสาหกรรมการบินนานาชาติ</option>
                                <option value="วิทยาลัยวิจัยนวัตกรรมทางการศึกษา">วิทยาลัยวิจัยนวัตกรรมทางการศึกษา</option>
                                <option value="วิทยาลัยวิศวกรรมสังคีต">วิทยาลัยวิศวกรรมสังคีต</option>
                                <option value="ทั้งหมด">ทั้งหมด</option>
                            </select>
                        </div>
                    </div>

                    <div className="row">
                        <div className="Post-Column Post-Input">
                            <h2>คำอธิบายกิจกรรม</h2>
                        </div>
                        <div className="Post-Column2 Post-Input">
                            <textarea type="text" name="description" className="Post-Input-Fill-Data Post-Input-Large-Fill-Data" placeholder="" onChange={handleChange} value={userInfo.description} />
                        </div>
                    </div>



                </div>
                {/* <div>
                    <div className="row">
                        <button onClick={handleSubmit}>click</button>
                    </div>

                    </div> */}
            </form>
            <div class="container">
                <button
                    type="submit"
                    name="button"
                    className="Post-Submit-Button"
                    onClick={handleCreateShow}
                >บันทึก</button>
            </div>
            {/* <button
                type="submit"
                name="button"
                className="Post-Submit-Button"
                onClick={handleCreateShow}
            >บันทึก</button> */}

            {/* <button onClick={handleSubmit}>onClick</button> */}
            {/* <div className="Post-Page"> */}

            {/* <div className="row"> */}

            {/* </div>
                </div> */}
            <div className="Post-Page">
                <Modal
                    show={show}
                    onHide={handleCreateClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>ยืนยันข้อมูลกิจกรรม</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        ชื่อกิจกรรม : {userInfo.name}
                        <br></br>
                            วันที่จัดกิจกรรม :
                            {dateFormat(userInfo.dateStart, "d mmmm yyyy")} ถึง {dateFormat(userInfo.dateEnd, "d mmmm yyyy")}
                        <br></br>
                            เวลาที่จัดกิจกรรม : {userInfo.timeStart} น. ถึง {userInfo.timeEnd}{" "}น.<br></br>
                            สถานที่ : {userInfo.place}
                        <br></br>
                            คณะ/วิทยาลัย : {userInfo.major}
                        <br></br>
                            จำนวนที่เปิดรับสมัคร : {userInfo.participantsNumber} คน<br></br>
                            วันที่ปิดรับสมัคร :{" "}
                        {dateFormat(userInfo.dateCloseApply, "d mmmm yyyy HH:MM")} น.<br></br>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="btn btn-outline-danger" onClick={handleCreateClose}>
                            ยกเลิก</Button>
                        <Button variant="btn btn-info" type="submit" onClick={handleSubmit}>
                            ยืนยัน</Button>
                    </Modal.Footer>
                </Modal>
            </div>
            {/* </div> */}

        </div>
    );
};

export default post;