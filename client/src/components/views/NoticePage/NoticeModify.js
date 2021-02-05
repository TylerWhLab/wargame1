import React, { useState, useEffect } from 'react'
import { Button, Form, Input } from 'antd';
import axios from 'axios';
import FileUp from '../../utils/FileUp';

const { TextArea } = Input;

function NoticeModify(props) {

    const notice = props.location.state.notice;

    const [Title, setTitle] = useState("")
    const [Content, setContent] = useState("")
    // const [NoticeNo, setNoticeNo] = useState(0)
    // const [Views, setViews] = useState(1)
    // const [Writer, setWriter] = useState([])
    const [Path, setPath] = useState("")
    const [OrgFileName, setOrgFileName] = useState("")
    const [RealFileName, setRealFileName] = useState("")

    
    useEffect(() => {
        window.scrollTo(0, 0); // 수정화면 접근 시 스크롤 상단으로 이동
        
        setTitle(notice.title);
        setContent(notice.content);
        setPath(notice.path);
        setOrgFileName(notice.orgFileName);
        setRealFileName(notice.realFileName);

    }, [])


    const fileUploadResult = (path, orgFileName, realFileName) => {
        setPath(path)
        setOrgFileName(orgFileName)
        setRealFileName(realFileName)
    }

    const titleChangeHandler = (event) => {
        setTitle(event.currentTarget.value)
    }

    const contentChangeHandler = (event) => {
        setContent(event.currentTarget.value)
    }

    const submitHandler = (event) => {
        event.preventDefault();

        if (!Title) {
            return alert("제목을 작성해 주세요")
        }
        if (!Content) {
            return alert("내용을 작성해 주세요")
        }
        if (!Path || !OrgFileName || !RealFileName) {
            return alert("파일을 업로드 해주세요.")
        }

        const reqBody = {
            userId: props.user.userData.userId, //로그인 된 사람의 ID // auth.js에서 현재 사용자 정보 넣어두었다. 
            title: Title,
            content: Content,
            path: Path,
            orgFileName: OrgFileName,
            realFileName: RealFileName,
            fileId: notice.fileId,
            noticeId: notice.noticeId
        } // console.log(reqBody);
        
        axios.post(`http://${process.env.REACT_APP_BACKEND_SERVER}/api/notice/update`, reqBody, { withCredentials: true })
            .then(response => {
                if (response.data.success) {
                    alert('공지 수정에 성공 했습니다.');
                    props.history.push('/notice');
                } else {
                    alert('공지 수정에 실패 했습니다.');
                }
            })
    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2>공지사항 수정</h2>
            </div>

            <Form>
                <br />
                <br />
                <label>제목</label>
                    <Input onChange={titleChangeHandler} value={Title} />
                <br />
                <br />
                <label>내용</label>
                    <TextArea onChange={contentChangeHandler} value={Content} style={{ height: '250px' }} />
                <br />
                <br />
                <label>첨부파일</label>
                    <FileUp refreshFunction={fileUploadResult} fileName={ notice } />
                {/* <br />
                <br /> */}
                <Button type="submit" onClick={submitHandler} style={{ float: 'right' }}>
                    수정완료
                </Button>
                <br />
            </Form>


        </div>
    )
}

export default NoticeModify
