package agenda.react

import grails.rest.*
import grails.converters.*

class BandaController {
    static responseFormats = ['json', 'xml']

    def index() {

        def entities = Banda.list()
        def model = [:] //cria uma variavel que recebe um JSON

        model.put('entities', entities) //coloca a lista dentro do JSON
        respond model //responde com o JSON criado
    }

    def adicionar() {

        Banda novaBanda = new Banda()
        novaBanda.nome
        novaBanda.genero
    }

    def save() {

        Banda banda = new Banda()
        if (params.id) {
            banda = Banda.get(params.id)
        }

        banda.nome = params.nomeBanda
        banda.genero = params.generoBanda

        banda.validate()

        if (!banda.hasErrors()) {
            banda.save(flush: true)
            render('salvo com sucesso')
        } else {
            return hasErrors();
        }
    }

    def show() {

        Banda entities = Banda.get(params.id)
        def model = [:]

        model.put('entities', entities)
        respond model
    }

    def delete() {

        Banda banda = Banda.get(params.id)
        banda.delete(flush: true)
        render('deletado com sucesso')
    }
}
