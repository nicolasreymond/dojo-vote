<template>
  <div class="contact-info">
    <b-card title="Contact us!" sub-title="Contact informations">
      <b-card-text>
        Heres how you can contact us :
      </b-card-text>

      <b-card-text>
        <ul>
          <li>Email: {{email}}</li>
          <li>Website: <a href="">{{web}}</a></li>
        </ul>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'Contact',
  data(){
    return {
      email: "n.reymond.12@gmail.com",
      web: ""
    }
  }
}
</script>