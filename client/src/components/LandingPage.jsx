import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
    return (
        <div>
            <Link to='/home'>
                <button>Ir al Home</button>
            </Link>
        </div>
    )
}