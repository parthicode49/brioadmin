import './loader.css';

export default function Loader(props) {
    return (
    
        <div class="loader-container">
            <div className='overlay'></div>
            <div className='loader'>
                <div class='lds-roller'>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div style={{color:"var(--themeFontColor)"}}>Loading</div>
            </div>
        </div>
    );
}