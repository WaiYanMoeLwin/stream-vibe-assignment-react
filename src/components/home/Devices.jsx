import { useEffect, useState } from 'react';
import api from '../../api/api';

export default function Devices() {
    const [devices, setDevices] = useState([]);
    useEffect(() => {
        api.fetchDevices().then((devicesData) => {
            setDevices(devicesData);
        });
    }, [])
    return (
        <section id="devices">
            <header className="section-header">
                <article>
                    <h2 className="section-title">
                        We Provide you streaming experience across various devices.
                    </h2>
                    <p className="section-description">
                        With StreamVibe, you can enjoy your favorite movies and TV shows
                        anytime, anywhere. Our platform is designed to be compatible with a wide
                        range of devices, ensuring that you never miss a moment of
                        entertainment.
                    </p>
                </article>
            </header>
            <article className="device-cards">
                {devices.map((device) => (
                    <div className="device-container" key={device.id}>
                        <div className="device-header">
                            <img src={device.icon} alt={device.name} />
                            <h3 className="device-name">{device.name}</h3>
                        </div>
                        <p className="device-description">{device.description}</p>
                    </div>
                ))}
            </article>
        </section>

    )
}