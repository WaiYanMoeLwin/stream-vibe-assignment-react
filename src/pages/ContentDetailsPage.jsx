import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useSearchParams } from "react-router-dom";
import LoadingScreen from "../components/common/LoadingScreen";
import MainTemplate from "../components/common/MainTemplate";
import MainInfo from "../components/content-details/MainInfo";
import SidebarInfo from "../components/content-details/SidebarInfo";
import Trailer from "../components/content-details/Trailer";
import '../scss/content-detail.scss';
import useContentStore from "../stores/content-store";

export default function ContentDetailsPage() {
    const [searchParams] = useSearchParams();
    const contentId = searchParams.get("id");
    // const [contentDetails, setContentDetails] = useState(null);
    // const [seasonInfo, setSeasonInfo] = useState(null);
    // const [mockContentDetails, setMockContentDetails] = useState();
    const isSmallScreen = useMediaQuery({ maxWidth: 1023 });
    const loadContentDetails = useContentStore((state) => state.loadContentDetails);
    const isLoading = useContentStore((state) => state.isLoading);

    const content = useContentStore((state) => state.content.find(item => item.id === contentId));
    const seasonInfo = content ? content.seasons : null;
    const mockContentDetails = content ? content.mockData : null;
    const contentDetails = content ? content.details : null;

    useEffect(() => {
        loadContentDetails(contentId);
    }, [contentId, loadContentDetails]);
    return (
        <MainTemplate id="content-detail" page="movies-and-shows">
            <Trailer
                id="thumbnail"
                trailer={{id: contentId}}
                carousel={false}
            />
            <section id="content-info">
                { (isLoading || !content) ? (
                    <LoadingScreen />
                )
                : (
                    <>
                    <MainInfo contentDetails={contentDetails} mockContentDetails={mockContentDetails} seasonInfo={seasonInfo} />
                    {!isSmallScreen && <SidebarInfo contentDetails={contentDetails} mockContentDetails={mockContentDetails} />}
                    </>
                )}
            </section>
        </MainTemplate>
    )
}