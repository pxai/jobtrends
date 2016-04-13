module.exports = {
	'position': {'type':'text', 'selector':'#prefijoPuesto'},
	'city' : {'type':'text', 'selector': '#prefijoPoblacion'},
	'province': {'type':'text', 'selector': '#prefijoProvincia'},
	'country': {'type':'text', 'selector': '#prefijoPais'},
	'employerName': {'type':'text', 'selector':'li[itemProp=hiringOrganization] a'},
	'employerLogo': {'type':'text', 'selector':'div#content-logo-media img'},
	'salary': {'type':'text', 'selector':'span[itemProp=baseSalary]'},
	'experience': {'type':'text', 'selector':'span[itemProp=experienceRequirements]'},
	'timetable' : {'type':'text', 'selector':'span#prefijoJornada'},
	'description': {'type':'text', 'selector':'div#prefijoDescripcion1'},
	'reference': {'type':'text', 'selector':'reference'},
	'category': {'type':'text', 'selector':'#prefijoCat'},
	'subcategory': {'type':'text', 'selector':'#prefijoSubCat'},
	'level': {'type':'text', 'selector':'#prefijoNivelLaboral'},
	'employees': {'type':'text', 'selector':'#prefijoPersonalACargo'},
	'vacants': {'type':'text', 'selector':'#prefijoVacantes'},
	'studies': {'type':'text', 'selector':'#prefijoEstMin'},
	'experienceRequirements': {'type':'text', 'selector':'li[itemProp=experienceRequirements] span'},
	'skills': {'type':'array', 'selector':'a.sticker-skill'},
	'industrySector': {'type':'unspecified', 'title':'h3:contains(\'Tipo de industria\')','selector':'span'}

};