import MainRouteGuard from "../guards/MainRouteGuard";
import DashboardPage from "./dashboard_page";

function LandingPage() {

    return <></>
}

export default function HomePageRoute({}) {

    return (
        <MainRouteGuard DefaultComponent={LandingPage}>
            <DashboardPage />
        </MainRouteGuard>
    )
}