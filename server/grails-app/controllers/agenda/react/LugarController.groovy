package agenda.react


import grails.rest.*
import grails.converters.*

class LugarController {
	static responseFormats = ['json', 'xml']

    def index() {
        def entities = Lugar.list()
        def model = [:] //cria uma variavel que recebe um JSON

        model.put('entities', entities) //coloca a lista dentro do JSON
        respond model //responde com o JSON criado
    }

    def adicionar(){

        Lugar novoLugar = new Lugar()
        novoLugar.nome
        novoLugar.capacidade

        render(template: "/lugar/cadastroLugar", model: [lugar: novoLugar])
    }

    def save() {

        Lugar lugar = new Lugar()
        if (params.id) {
            lugar = Lugar.get(params.id)
        }

        lugar.nome = params.nomeLugar
        lugar.capacidade = Integer.parseInt(params.capacidade)

        lugar.validate()

        if (!lugar.hasErrors()) {
            lugar.save(flush: true)
            render('salvo com sucesso')
        } else {
            render("errors ao salvar")
        }
    }

    def listar(){

        def lista = Lugar.list()
        render(template: "/lugar/listarLugar", model: [lugares: lista])
    }

    def show(){

        Lugar entities = Lugar.get(params.id)
        def model = [:]

        model.put('entities', entities)
        respond model
    }

    def delete(){

        Lugar lugar = Lugar.get(params.id)
        lugar.delete(flush: true)
        render('deletado com sucesso!')
    }
}
