import { defineComponent, watchEffect } from 'vue';
import { useForm } from 'vee-validate';
import { useRouter } from 'vue-router';
import { getProductById } from '@/modules/products/actions/get-product-by-id.action';
import { useQuery } from '@tanstack/vue-query';
import * as yup from 'yup';

const validationSchema = yup.object({
  title: yup.string().required('Título es requerido').min(3),
  slug: yup.string().required('Slug es requerido'),
  description: yup.string().required('Descripción es requerido'),
  price: yup.number().required('Precio es requerido'),
  stock: yup.number().min(1).required(),
  gender: yup.string().required().oneOf(['men', 'women', 'kid']),
});

export default defineComponent({
  props: {
    productId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();
    const {
      // data: product,
      isError,
      isLoading,
    } = useQuery({
      queryKey: ['product', props.productId],
      queryFn: () => getProductById(props.productId),
      retry: false,
    });
    const { values, defineField, errors } = useForm({
      validationSchema,
    });
    const [title, titleAttrs] = defineField('title');
    const [slug, slugAttrs] = defineField('slug');
    const [description, descriptionAttrs] = defineField('description');
    const [price, priceAttrs] = defineField('price');
    const [stock, stockAttrs] = defineField('stock');
    const [gender, genderAttrs] = defineField('gender');

    watchEffect(() => {
      if (isError.value && !isLoading.value) {
        router.replace('/admin/products');
        return;
      }
    });
    return {
      // properties
      values,
      errors,
      title,
      titleAttrs,
      slug,
      slugAttrs,
      description,
      descriptionAttrs,
      price,
      priceAttrs,
      stock,
      stockAttrs,
      gender,
      genderAttrs,

      // Getters

      allSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],

      // Actions
    };
  },
});
