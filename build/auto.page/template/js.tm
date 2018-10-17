<script>

import DetailStyle from '~/components/DetailStyle';
import LabelText from '~/components/LabelText';
import utils from '~/plugins/utils';
import dateUtils from 'vue-dateutils';

export default {
	head() {
		return {
			title: "${head}"
		}
	},
	components: {
		DetailStyle,
		LabelText
	},
	data() {
		return {
			basicInfo: {},
		}
	},

	mounted () {
		GLOBALSIDESWITCH('false');
		this.getDetailData();
	},

	methods: {
		getDetailData() {
			${fromData}
			this.$http.get('${ajaxUrl}', fromData).then((response) => {
				this.basicInfo = response.data;
				
			}).catch((error) => {
				this.$Notice.error({
					title: error.message
				});
			})
		}
	}
}
</script>
