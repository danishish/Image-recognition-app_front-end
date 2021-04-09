import React from 'react';
import './ImageLinkForm.css';


const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
return (
            <div>
            <p className='f3'>

                {'Paste image link below and click detect button, It will detect faces in your pictures.'}</p>
                <div className='center'>
                    <div className=' w-50 form center pa4 br3 shadow-5'>
                        <input className='f4 pa2 w-90 center' type='tex' onChange={onInputChange}/>
                        <button className='w-30 grow f4 link ph3 pv2 dib bg-cyan'
                        onClick={onButtonSubmit}>Detect</button>
                    </div>
                </div>
            </div>
        );
}   
export default ImageLinkForm;