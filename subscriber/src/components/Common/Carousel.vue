<template>
<div>
<v-img src="https://ak1.picdn.net/shutterstock/videos/1020611911/thumb/4.jpg" aspect-ratio="1.7" cover gradient="to top right, rgba(255,255,2555,0.5), rgba(255,255,255,0.5)">
    <NavBar />
    <center>
    <Advocation/>
    <Form/>
    </center>
</v-img>

</div>
</template>

<script>
import Advocation from '@/components/Advocation.vue'
import NavBar from '@/components/Navigation.vue'
import Form from '@/components/Form.vue'

export default {
    components: {
        Advocation,
        NavBar,
        Form
    }

}
</script>

<style scoped>
</style>
