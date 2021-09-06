<script>
import { setToken } from '@/utils/core';
export default {
  name: 'AuthRedirect',
  created() {
    const hash = window.location.search.slice(1);
    setToken(hash);
    window.close();
  },
  render: function(h) {
    return h(); // avoid warning message
  }
};
</script>
