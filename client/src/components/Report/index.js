import "./style.css";
import PhoneInTalkRoundedIcon from '@mui/icons-material/PhoneInTalkRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import LipidImage from "../../assets/icons/lipid.svg";
import CancerImg from "../../assets/icons/cancer-screening.svg";
import PushPinRoundedIcon from '@mui/icons-material/PushPinRounded';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
import { calculateAge } from "../../utils/Dates";
import { calculatePosition } from "../../utils/Position";

const IMG = {
    "LIPID_PROFILE": LipidImage,
    "CANCER_SCREENING": CancerImg
}

const Report = ({reportData, reportType}) => (
    <div>
        <div className="report-header">
            <span className="logo">Smart Report</span>
            <div className="list">
                <span className="item">
                    <PhoneInTalkRoundedIcon />
                    +91 95615959XX
                </span>
                <span className="item">
                    <EmailRoundedIcon />
                    contact@smartreport.com
                </span>
                <span className="item">
                    <LanguageRoundedIcon />
                    www.smartreport.com
                </span>
            </div>
        </div>
        <div className="report-user">
            <div className="user-item">
                <span className="label">Name</span>
                <span className="value">{reportData.user.firstName + " " + reportData.user.lastName}</span>
            </div>
            <div className="user-item">
                <span className="label">Report No</span>
                <span className="value">{reportData.id}</span>
            </div>
            <div className="user-item">
                <span className="label">Basic Info</span>
                <span className="value">{reportData.user.gender + "  | " + calculateAge(reportData.user.dateOfBirth)}</span>
            </div>
            <div className="user-item">
                <span className="label">Bate of Test</span>
                <span className="value">{reportData.dateOfTest}</span>
            </div>
        </div>
        <div className="report-description">
            <img src={IMG[reportType.code]} alt=""/>
            <p className="description">
                <span className="head">{reportType.name}</span>
                <span className="body">{reportType.description}</span>
            </p>
        </div>
        <div className="chips">
            <span className="chip normal">normal</span>
            <span className="chip borderline">borderline</span>
            <span className="chip abnormal">abnormal</span>
        </div>
        <div className="report-table">
            <div className="report-table-row head">
                <div className="report-table-row--item">
                    <span className="label">Test Name</span>
                    <span className="value"><b>Result</b> unit</span>
                </div>
                <div className="report-table-row--item-2">
                    <span className="label">Range</span>
                </div>
            </div>

            {reportData.result && Array.isArray(reportData.result) && reportData.result.map((data, index)=> (
                <div className={"report-table-row " + data.score} key={index}>
                    <div className="report-table-row--item">
                        <span className="label">{data.code.replaceAll("_", " ")}</span>
                        <span className="value"><b>{data.value}</b> {data.units}</span>
                    </div>
                    <div className="report-table-row--item-2-wrapper">
                        <div className="report-table-row--item-2">
                            <PushPinRoundedIcon style={{position: "absolute", left: calculatePosition(data.value, data.minValue, data.maxValue) + "%", transform: "translate(-50%, -50%)"}}/>
                            <span className="swift abnormal" style={parseFloat(data.minValue) === 0 ? {display: "none"} : {}}>low </span>
                            <span className={"swift " + data.score}><b>{data.minValue}</b> {data.score} <b>{data.maxValue}</b> </span>
                            <span className="swift abnormal">high</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        <div className="report-table-footer">
            <span className="chip primary head">Risk Factors</span>
            <div className="footer-content">
                <p className="footer-item">
                    <TaskAltRoundedIcon />
                    <span>The elderly are susceptible to heart disease</span>
                </p>
                <p className="footer-item">
                    <TaskAltRoundedIcon />
                    <span>Heart disease can be genetic</span>
                </p>
                <p className="footer-item">
                    <TaskAltRoundedIcon />
                    <span>High BP overtime leads ot heart disease</span>
                </p>
            </div>
        </div>
    </div>
)

export default Report;