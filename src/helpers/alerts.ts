import { isNil } from "lodash";
import Swal from "sweetalert2";

import './alerts.scss';

type positionT = 'top' | 'top-start' | 'top-end' | 'center' | 'center-start' | 'center-end' | 'bottom' | 'bottom-start' | 'bottom-end';
type iconsT = 'success' | 'error' | 'warning' | 'info' | 'question';

interface alertsI {
    title: string;
    width?: number;
    position?: positionT;
    icon?: iconsT;
    showConfirmButton?: boolean;
    timer?: number;
    showCloseButton?: boolean;
}

const iconsObj = {
    'success' : 'fas fa-thumbs-up',
    'error' : 'fas fa-circle-xmark',
    'warning' : 'fas fa-triangle-exclamation',
    'info' : 'fas fa-circle-info',
    'question': 'fas fa-circle-question',
}

const colorsObj = {
    'success' : 'text-success',
    'error' : 'text-danger',
    'warning' : 'text-warning',
    'info' : 'text-primary',
    'question': 'text-secondary',
}


const simpleAlertTimer = (data: alertsI) => {

    const iconSelected:string = isNil(data?.icon) === false ? iconsObj[data.icon] : "";
    const textColor: string = isNil(data?.icon) === false ? colorsObj[data.icon] : "text-primary";

    const alertMessageHtml = `
    <p class="f-700 mb-0 text-center ${textColor}" style="font-size: 15px;">
        <i class="${iconSelected} me-2" ></i>
        ${isNil(data?.title) === false ? data.title : ""}
    </p>`;

    return Swal.fire({
        width: isNil(data?.width) === false ? data.width : "300",
        position: isNil(data?.position) === false ? data.position : "top-end",
        // icon: isNil(data?.icon) === false ? data.icon : "",
        // title: isNil(data?.title) === false ? data.title : "",
        html: alertMessageHtml,
        showConfirmButton: isNil(data?.showConfirmButton) === false ? data.showConfirmButton : false,
        timer: isNil(data?.timer) === false ? data.timer : 1500,
        timerProgressBar: true,
        showCloseButton:  isNil(data?.showCloseButton) === false ? data.showCloseButton : false,
    });
}

export {
    simpleAlertTimer
}