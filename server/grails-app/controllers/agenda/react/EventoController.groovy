package agenda.react


import grails.rest.*
import grails.converters.*

import java.text.SimpleDateFormat

class EventoController {
	//static responseFormats = ['json', 'xml']

    def index() {

        def entities = Evento.list()
        def model = [:] //cria uma variavel que recebe um JSON

        model.put('entities', entities) //coloca a lista dentro do JSON
        respond model //responde com o JSON criado
    }

    def adicionar() {

        Evento novoEvento = new Evento()
        novoEvento.diaEvento

        def lista = Lugar.list()
        render(template: "/evento/cadastroEvento", model: [evento: novoEvento, lugares: lista])
    }

    def save() {

        //converte de String para Date
        String dataTela = params.dia
        SimpleDateFormat formato = new SimpleDateFormat("yyyy-MM-dd")
        Date data = formato.parse(dataTela)

        //busca a variavel idLugar dentro da tabela lugar
        Lugar lugar = Lugar.findById(params.idLugar) //idLugar é a variavel do select na tela

        Evento evento = new Evento()
        evento.diaEvento = data
        evento.lugarEvento = lugar //é o objeto nome referenciando a tabela lugar

        evento.validate()

        if (!evento.hasErrors()) {
            evento.save(flush: true)
            render('salvo com sucesso')
        } else {
            println getErrors()
        }
    }

    def pesquisar(){

        List<Evento> eventos = []

        if(params.pesquisar) {
            List<Evento> lista = Evento.findAllByLugar(Lugar.findAllByNomeIlike("%${params.pesquisar}%"))
            render(template:"listaEventos", model: [eventos: lista])
        } else {
            eventos = Evento.list()
            render(template:"listaEventos", model: [eventos: eventos])
        }
    }

    def excluir() {

        Evento evento = Evento.findById(params.long('idEvento'))
        evento.delete(flush: true)

        def lista = Evento.list()
        render(template: '/evento/listaEventos', model: [eventos: lista])
    }
}
