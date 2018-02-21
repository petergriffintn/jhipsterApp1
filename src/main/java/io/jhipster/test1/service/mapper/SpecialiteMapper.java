package io.jhipster.test1.service.mapper;

import io.jhipster.test1.domain.*;
import io.jhipster.test1.service.dto.SpecialiteDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Specialite and its DTO SpecialiteDTO.
 */
@Mapper(componentModel = "spring", uses = {EtablissementMapper.class, ParcoursMapper.class})
public interface SpecialiteMapper extends EntityMapper<SpecialiteDTO, Specialite> {

    @Mapping(source = "etablissement.id", target = "etablissementId")
    @Mapping(source = "parcours.id", target = "parcoursId")
    SpecialiteDTO toDto(Specialite specialite);

    @Mapping(source = "etablissementId", target = "etablissement")
    @Mapping(source = "parcoursId", target = "parcours")
    Specialite toEntity(SpecialiteDTO specialiteDTO);

    default Specialite fromId(Long id) {
        if (id == null) {
            return null;
        }
        Specialite specialite = new Specialite();
        specialite.setId(id);
        return specialite;
    }
}
