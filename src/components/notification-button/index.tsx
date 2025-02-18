import './styles.css';

import axios from 'axios';
import { toast } from 'react-toastify';

import icon from '../../assets/img/notification-icon.svg';
import { BASE_URL } from '../../utils/request';

type Props = {
  readonly saleId: number;
};

function handleClicked(saleId: number): void {
  axios
    .get(`${BASE_URL}/sales/${saleId}/send-sms`)
    .then(() => toast.success("Notificação enviada com sucesso!"))
    .catch(() => toast.error("Erro ao enviar notificação!"));
}

function NotificationButton({ saleId }: Props) {
  return (
    <button className="dsmeta-red-btn" onClick={() => handleClicked(saleId)}>
      <img src={icon} alt="Notificar" />
    </button>
  );
}

export default NotificationButton;
