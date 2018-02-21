package io.jhipster.test1.service.mapper;

import io.jhipster.test1.domain.*;
import io.jhipster.test1.service.dto.MentionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Mention and its DTO MentionDTO.
 */
@Mapper(componentModel = "spring", uses = {DomaineMapper.class})
public interface MentionMapper extends EntityMapper<MentionDTO, Mention> {

    @Mapping(source = "domaine.id", target = "domaineId")
    MentionDTO toDto(Mention mention);

    @Mapping(source = "domaineId", target = "domaine")
    Mention toEntity(MentionDTO mentionDTO);

    default Mention fromId(Long id) {
        if (id == null) {
            return null;
        }
        Mention mention = new Mention();
        mention.setId(id);
        return mention;
    }
}
