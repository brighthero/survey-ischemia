const questions = [
	{
		question: "Жалобы, анамнез заболевания:",
		answers: [
			"Наличие в анамнезе заболеваний ССС, в том числе мерцательной аритмии, сахарного диабета, атеросклероза сосудов нижних конечностей.",
			"Снижение массы тела, постпрандиальный болевой синдром, боязнь приёма пищи.",
			"Ничего из вышеперечисленного."],
		nextQuestion: [1, 1, 6]
	},
	{
		question: "Необходимо исследование коагулограммы и липидного спектра крови с определением АЧТВ и уровня D-диммеров в крови, уровня триглицеридов, липопротеидов высокой и низкой плотности. <p>Также необходимо дуплексное ангиосканирование мезентериального кровотока. <p><p><p><p>Были ли обнаружены нарушения проходимости по брыжеечным сосудам?",
		answers: [
			"Да.",
			"Нет.",
		],
		nextQuestion: [2, 2]
	},
	{
		question: "Необходимо выполнение фиброколоноскопии + мультифокальная биопсия. Результаты:",
		answers: [
			"Опухоль толстой кишки.",
			"Ишемическое повреждение.",
			"Хронический колит, НЯК, БК.",
		],
		nextQuestion: [3, 4, 5]
	},
	{
		question: "Необходимо лечение у онколога.",
		answers: ["Начать заново."],
		nextQuestion: [0]
	},
	{
		question: "Необходимо проведение ангиографии, КТ-ангиографии, МР-ангиографии.",
		answers: ["Начать заново."],
		nextQuestion: [0]
	},
	{
		question: "Необходимо лечение у гастроэнтеролога, колопроктолога.",
		answers: ["Начать заново."],
		nextQuestion: [0]
	},
	{
		question: "У пациента отсутствует хроническая мезентериальная ишемия.",
		answers: ["Начать заново."],
		nextQuestion: [0]
	},
];

const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitBtn = document.querySelector('#submit');

let score = 0;
let questionIndex = 0;

clearPage();
showQuestion();
submitBtn.onclick = checkAnswer;

function clearPage() {
	headerContainer.innerHTML = '';
	listContainer.innerHTML = '';
}

function showQuestion() {
	const headerTemplate = `<h2 class="title">%title%</h2>`;
	const title = headerTemplate.replace('%title%', questions[questionIndex]['question']);
	headerContainer.innerHTML = title;
	listContainer.innerHTML = '';

	let answerNumber = 0;
	for (answerText of questions[questionIndex]['answers']) {
		const questionTemplate =
			`<li>
				<label>
					<input nextquestion="%nextquestion%" type="radio" class="answer" name="answer" />
					<span>%answer%</span> 
				</label>
			</li>`;
		
			const answerHTML = questionTemplate
							.replace('%answer%', answerText)
							.replace('%nextquestion%', questions[questionIndex].nextQuestion[answerNumber]);
			listContainer.innerHTML += answerHTML;
			answerNumber++;
	}


}

function checkAnswer() {
	const checkedRadio = listContainer.querySelector('input[type="radio"]:checked');
	if (!checkedRadio) {
		submitBtn.blur();
		return;
	}
	questionIndex = checkedRadio.getAttribute('nextquestion');
	showQuestion();
}