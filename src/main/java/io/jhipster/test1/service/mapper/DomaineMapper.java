package io.jhipster.test1.service.mapper;

import io.jhipster.test1.domain.*;
import io.jhipster.test1.service.dto.DomaineDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Domaine and its DTO DomaineDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface DomaineMapper extends EntityMapper<DomaineDTO, Domaine> {


    @Mapping(target = "mentions", ignore = true)
    Domaine toEntity(DomaineDTO domaineDTO);

    default Domaine fromId(Long id) {
        if (id == null) {
            return null;
        }
        Domaine domaine = new Domaine();
        domaine.setId(id);
        return domaine;
    }
}
