import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useSearchParams } from "react-router-dom";
import api from "../api/api";
import MainTemplate from "../components/common/MainTemplate";
import MainInfo from "../components/content-details/MainInfo";
import SidebarInfo from "../components/content-details/SidebarInfo";
import Trailer from "../components/content-details/Trailer";
import '../scss/content-detail.scss';

export default function ContentDetailsPage() {
    const [searchParams] = useSearchParams();
    const contentId = searchParams.get("id");
    const [contentDetails, setContentDetails] = useState(null);
    const [mockContentDetails, setMockContentDetails] = useState();
    const isSmallScreen = useMediaQuery({ maxWidth: 1023 });

    useEffect(() => {
        api.fetchContentDetails(contentId).then((details) => {
            setContentDetails(details);
        });
        api.fetchMoviesAndShows().then((mockDetails) => {
            setMockContentDetails(mockDetails.find(content => content.id === contentId));
        });
    }, [contentId]);
    return (
        <MainTemplate id="content-detail" page="movies-and-shows">
            <Trailer
                id="thumbnail"
                trailer={{id: contentId}}
                carousel={false}
            />
            <section id="content-info">
                { contentDetails && (
                    <>
                    <MainInfo contentDetails={contentDetails} mockContentDetails={mockContentDetails} />
                    {!isSmallScreen && <SidebarInfo contentDetails={contentDetails} mockContentDetails={mockContentDetails} />}
                    </>
                )}
            </section>
        </MainTemplate>
    )
}