import React from 'react'
import axios from 'axios';
import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { saveAs } from 'file-saver';


/**파일 다운로드 모듈 */
function FileDown(props) {

    const orgFileName = props.fileName.orgFileName // 보여주기용 파일명
    const realFileName = props.fileName.realFileName // request 전용 파일명
    const path = props.fileName.path

    // 다운로드 버튼 클릭 이벤트
    const onDownload = () => {

        if ( ! realFileName ) {
            alert('업로드한 파일이 없습니다.');
            return false;
        }

        let requestBody = {
            realFileName: realFileName,
            path: path
        }

        let reqConf = {
            responseType: "arraybuffer",
            // header: { 'content-type': 'application/octet-stream' }
            withCredentials: true
        }

        axios.post(`http://${process.env.REACT_APP_BACKEND_SERVER}/api/file/down`, requestBody, reqConf)
            .then(response => {

                var enc = new TextDecoder("utf-8");
                var arr = new Uint8Array(response.data);
                var strResponse = enc.decode(arr);
                var res = {};
                try {
                    res = JSON.parse(strResponse);

                    if ( res.success && res.success === 'nofile' ) {
                        alert('다운로드 실패! \n' + res.msg);
                        return false;
                    }

                } catch { // file exist
                    if (response.data) {
                        const blob = new Blob( [response.data], {type: "application/octet-stream"} );
                        saveAs(blob, orgFileName);
                    }
                }
                
            })
    }
   

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
                <div style={{margin: '5px 10px 0px 0px'}}>
                    첨부파일 : [{orgFileName}]
                </div>
                <Button type="primary" onClick={onDownload}>
                    다운로드 <DownloadOutlined />
                </Button>
            </div>
        </div>
    )
}

export default FileDown

