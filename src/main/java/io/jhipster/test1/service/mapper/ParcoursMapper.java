package io.jhipster.test1.service.mapper;

import io.jhipster.test1.domain.*;
import io.jhipster.test1.service.dto.ParcoursDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Parcours and its DTO ParcoursDTO.
 */
@Mapper(componentModel = "spring", uses = {DiplomeMapper.class, MentionMapper.class})
public interface ParcoursMapper extends EntityMapper<ParcoursDTO, Parcours> {

    @Mapping(source = "diplome.id", target = "diplomeId")
    @Mapping(source = "mention.id", target = "mentionId")
    ParcoursDTO toDto(Parcours parcours);

    @Mapping(source = "diplomeId", target = "diplome")
    @Mapping(source = "mentionId", target = "mention")
    Parcours toEntity(ParcoursDTO parcoursDTO);

    default Parcours fromId(Long id) {
        if (id == null) {
            return null;
        }
        Parcours parcours = new Parcours();
        parcours.setId(id);
        return parcours;
    }
}
