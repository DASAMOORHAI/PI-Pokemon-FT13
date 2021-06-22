import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import '../fonts/font.css';

export default function LandingPage() {
    return (
        <div id='containerLP'>
            <Link to='/pokemon'>
                <button className='okBtn' id='HomeBtn'>Ir al Home</button>
            </Link>
        </div>
    )
}