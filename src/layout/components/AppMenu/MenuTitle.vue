<script>
export default {
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  render(h, context) {
    const { icon, title } = context.props;
    const vnodes = [];
    if (icon) {
      if (icon.includes('el-icon')) {
        vnodes.push(<i class={[icon, 'sub-icon']} />);
      } else if (icon.indexOf('icon') === 0) {
        vnodes.push(<i class={['fas', icon.replace('icon', 'fa'), 'sub-icon']} />);
      } else {
        vnodes.push(<i class={['fas', 'fa-' + icon, 'sub-icon']} />);
      }
    }
    if (title) {
      vnodes.push(<span slot='title' class='menu-text'>{(title)}</span>);
    }
    return vnodes;
  }
};
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
