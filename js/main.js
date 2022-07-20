/*
VueLoader
for Vue2 : https://github.com/FranckFreiburger/http-vue-loader
for Vue3 : https://github.com/FranckFreiburger/vue3-sfc-loader
*/

var app = new Vue({
  el: "#app",
  components: {
    'alerta': httpVueLoader('./components/alerta.vue'),
    'toast': httpVueLoader('./components/toast.vue')
  },
  data: {
    shoppingList: [],
    studyingList: [],
    tabs: ["Notas", "Dar uma nota"],
    toastMessage: '',
    courses: [
      {
        id: 1,
        course: "D-Já Vue - Uma jornada pela Web",
        image: "./images/dejavu_matrix.jpg",
        description: "Como construir aplicações web com agilidade e qualidade.",
        duration: 42,
        active: true,
        price: 100,
        message: "👉 50% Desconto! Últimos dias",
        style: {
          priceColor: "#ffc31c",
        },
        showReview: false,
        reviews: [],
        errors: [],
        rating: null,
        selectedTab: null,
      },
      {
        id: 2,
        course: "Git - Via terminal para aprender da forma correta!",
        image: "./images/logo-git-430-215-v3.jpg",
        description:
          "Entendendo Git através dos primeiros comandos via linha de comando.",
        duration: 21,
        active: false,
        price: 900,
        message: "👈 Melhor cursp do mercado",
        showReview: false,
        reviews: [],
        errors: [],
        selectedTab: null,
      },
      {
        id: 3,
        course: "Linux - Entendendo a tela preta!",
        image: "./images/logo-linux960x430.jpg",
        description:
          "Entendendo Git através dos primeiros comandos via linha de comando.",
        duration: 21,
        active: true,
        price: 0,
        showReview: false,
        reviews: [],
        errors: [],
        selectedTab: null,
      },
    ],
    theme: {
      priceColorDefault: "#56ad80",
    },
  },
  methods: {
    addCourse(course) {
      /**
       * Adiciona curso na lista de compras se o valor for > 0
       * caso contrário, adiciona na lista de estudos
       */
      let targetList = this.shoppingList;
      if (course.price == 0) {
        targetList = this.studyingList;
      }
      targetList.push(course);

      this.toastMessage = `${course.course.split(" - ")[0]} adicionado na sua lista de cursos!`;
      this.$refs.toast.showToast();
    },
    selectTab(courseIndex, tab) {
      this.courses[courseIndex].selectedTab = tab;
    },
    sendRewiew(courseIndex) {
      /* 
      Como utiliar recursos do HTML para não precisar do código de validação abaixo?
      Existe alguma vantagem em fazer assim?
      **/
      const course = this.courses[courseIndex];
      course.errors = [];
      if (!course.name || !course.name.trim()) {
        course.errors.push("Campo nome precisa ser preenchido");
      }
      if (!course.rating) {
        course.errors.push("Selecione uma nota");
      }

      if (course.errors.length > 0) {
        return;
      }

      let newReview = {
        date: new Date().toISOString(),
        name: course.name,
        review: course.review,
        rating: course.rating,
      };
      course.reviews.push(newReview);
      course.rating = undefined;
      course.name = undefined;
      course.review = undefined;
      course.selectedTab = undefined;

      this.toastMessage = "Sua reivão foi enviada! Muito obrigado pela contribuição";
      this.$refs.toast.showToast()
    },
    calcRating(courseIndex) {
      let reviews = this.courses[courseIndex].reviews;
      let total = 0;
      if (!reviews || reviews.length == 0) {
        return 0;
      }
      for (let index in reviews) {
        total += reviews[index].rating;
      }
      return (total / reviews.length).toFixed(1);
    }
  },
  computed: {
    studentNote() {
      let message = "Selecione um ou mais cursos e bora estudar!";
      if (this.studyingList.length > 0 && this.studyingList.length <= 10) {
        message = "Muito bem, você já pode iniciar seu estudo!";
      } else if (this.studyingList.length > 10) {
        message =
          "Opps! Não seria melhor focar os estudos em apenas algumas tecnologias?";
      }
      return message;
    },
  },
});
