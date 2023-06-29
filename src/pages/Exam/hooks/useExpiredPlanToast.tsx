import toast from "react-hot-toast";
import ExpiredSubscriptionPlanToast from "../../../components/toast/ExpiredSubscriptionPlanToast";

export default function () {
    return toast.error(t => <ExpiredSubscriptionPlanToast t={ t } />, {
        duration: 5000,
    })
}