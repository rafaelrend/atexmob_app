import moment from 'moment';
import 'moment/locale/pt-br';
import 'moment-duration-format';

export const dateFormat = (value, format) => {
  moment.locale('pt-BR');

  if (format == 'fromNow') return moment(value).fromNow();
  else if (format == 'milli') return moment(value).valueOf();
  else if (format == 'duration') return moment.duration(value).format('HH:mm:ss');
  else return moment(value).format(format);

}