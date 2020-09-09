<template>
    <div></div>
</template>

<script>
import Schart from 'vue-schart';
import bus from '../common/bus';
import { sublistFacilities } from '../../api/index';
export default {
    name: 'dashboard',
    data() {
        return {};
    },
    components: {
        Schart
    },
    computed: {},

    methods: {
        onccc() {
            let formData = {
                type: 'MeetingRoom',
                name: '102',
                num: 7,
                whiteBoard: true,
                beamer: true,
                speaker: true
            };
            sublistFacilities(formData).then(
                res => {
                    console.log(res);
                    setTimeout(() => {
                        console.log(res);
                    }, 1000);
                },
                err => {
                    console.log(err);
                }
            );
        }
    }
};
</script>


<style scoped>
</style>
