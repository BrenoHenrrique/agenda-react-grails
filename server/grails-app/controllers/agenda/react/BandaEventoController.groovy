package agenda.react


import grails.rest.*
import grails.converters.*

class BandaEventoController {
	static responseFormats = ['json', 'xml']

    def index() {}

    def listar(){

        List<Evento> eventos = []

        if(params.pesquisar) {
            Lugar lugar = Lugar.findByNomeLike("%${params.pesquisar}%")
            if(lugar)
                Evento.findAllByLugar(lugar)
        } else {
            eventos = Evento.list()
        }

        render(template:"/evento/listaEventos", model: [eventos: eventos])
    }

    def marcar(){

        List<Banda> listaBanda = Banda.list() //sempre use o List<dominio> no lugar do Def
        List<Evento> evento = Evento.findAll() ///findAll vai pegar todos os dados

        evento.each { //for.each para percorrer todos os campos
            it.lugar.nome //it pega a posição atual. como o lugarId está salvo dendo de evento conseguimos acessar o lugar e qualquer entendidade dele pelo evento
        }

        render(template: "/bandaEvento/marcarShow", model: [bandas: listaBanda, lugares: evento])

    }

    def finalizar(){

        /**.addToEventos() método para salvar na tabela banda_eventos dentro do parentese vai apenas o objeto de evento pois como evento pertence
         * a banda, banda automaticamente já recebe seu parametro pois foi deifinido em banda.findById(params.'nome da coluna')**/

        Evento evento = Evento.findById(params.idLugar)
        Banda banda = Banda.findById(params.idBanda)

        banda.addToEventos(evento)
        banda.save()

        render("salvo com sucesso")
    }

    def excluir(){

        Banda banda = Banda.get(params.idBanda)
        Evento evento = Evento.get(params.idEvento)

        banda.removeFromEventos(evento)
        banda.save()

        render('excluido com sucesso')
    }

    def showBandasPorEvento() {

        Evento evento = Evento.get(params.long('id'))

        if(evento){
            render(template:"bandasEvento", model: [evento: evento, bandas: evento.bandas])
        } else{
            render("Não há bandas cadastradas nesse evento.")
        }
    }
}
