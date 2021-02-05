import React from 'react'
import { SmileOutlined } from '@ant-design/icons';

function Footer() {
    return (
        <div style={{
            height: '80px', display: 'flex',
            flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', fontSize:'1rem'
        }}>
           <p style={{ fontSize:'2rem' }}> Created by 김정균 <SmileOutlined /></p>
           
        </div>
    )
}

export default Footer
