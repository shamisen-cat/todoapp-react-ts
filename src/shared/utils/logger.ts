// ログレベル設定
import log from 'loglevel';

if (import.meta.env.PROD) {
  log.setLevel('warn');
} else {
  log.setLevel('debug');
}

export default log;
