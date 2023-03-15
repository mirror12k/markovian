Array.prototype.random = function () { return this[Math.floor((Math.random()*this.length))] }

export const random_pages = () => fetch('https://en.wikipedia.org/w/api.php?action=query&format=json&list=random&rnlimit=100&rvslots=*&origin=*').then(r => r.json()).then(j => j.query.random.map(r => r.title).filter(p => !['User:','Talk:','Template:','Category:','Wikipedia:','File:','Portal:','Draft:'].some(s => p.startsWith(s)) && !p.includes(' talk:')))
export const query_page = page => fetch('https://en.wikipedia.org/w/api.php?action=query&format=json&prop=revisions&titles=' + page + '&formatversion=2&rvprop=content&rvslots=*&origin=*').then(r => r.json()).then(j => j.query.pages[0].revisions[0].slots.main.content)
export const strip_tags = s => s
		.replace(/\n/g, ' ')
		.replace(/\{\{[^{}]*\}\}|<[^<>]*>/g, "")
		.replace(/'''|''|==/g, "")
		.replace(/\[\[File([^\[\]]|\[\[[^\[\]]*\]\])*\]\]/g, '')
		.replace(/\[\[([^\[\]|]*)\|[^\[\]|]*\]\]/g, "$1")
		.replace(/\[\[([^\[\]]*)\]\]/g, "$1")
		.replace(/\[([^\[\]]*)\]/g, "")
		.replace(/\([^\(\)]*\)/g, "")

export const munge_text = s => s
		.replace(/[^a-zA-Z0-9,. \-]/g, '')
		.replace(/(\w{2,})([.,])/g, "$1 $2 ")
		.replace(/\s\s+/g, " ")
		.replace(/([.,] )\1+/g, "$1")
		.replace(/\s+,/g, ",").split(" . ").map(s => s + '.')
export const get_munged_page_text = page => query_page(page).then(s => munge_text(strip_tags(s)))

export const load_markov_chain = (t, v) => v.split(' ').filter(s => s !== '').reduce((p, s) => { p in t ? t[p].push(s) : t[p] = [ s ]; return s }, '')
export const make_markov_chain = (l, t) => { t = t || {}; l.forEach(s => load_markov_chain(t, s)); return t }
export const loop_while = (v, f) => { var l = [v]; while (v = f(v)) l.push(v); return l }
export const generate_sentence = t => loop_while(t[''].random(), v => { return t[v]?.random() } ).join(' ')
