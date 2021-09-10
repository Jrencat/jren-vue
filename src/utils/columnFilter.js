import { CtStorage } from '@/utils/core';

export default {
    computed: {

    },
    methods: {
        $_getColumns(defaultColumns = [], name) {
            const cachedColumns = CtStorage.getItem(this.$route.path + '_columns' + (name || ''));
            let result = [];
            if (cachedColumns) {
                const defaultKeys = defaultColumns.map(item => item.prop + item.label + item.disabled).join();
                const cachedKeys = cachedColumns.map(item => item.prop + item.label + item.disabled).join();
                if (defaultKeys !== cachedKeys) {
                    result = defaultColumns;
                    this.$_setColumns(defaultColumns);
                } else {
                    result = cachedColumns;
                }
            } else {
                result = defaultColumns;
            }
            return result;
        },
        $_setColumns(columns, name) {
            CtStorage.setItem(this.$route.path + '_columns' + (name || ''), columns);
        }
    }

};
