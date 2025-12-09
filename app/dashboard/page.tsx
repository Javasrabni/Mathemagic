
import SignedPage from "@/components/signedPage/SignedPage";

export default function Dashboard() {
    return (
        <div className="w-full h-full flex flex-col items-center justify-between">
            <div className="w-full h-full">
                <SignedPage />
            </div>
        </div>
    )
}
