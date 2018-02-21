package io.jhipster.test1.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import io.jhipster.test1.domain.enumeration.TypeUe;
import io.jhipster.test1.domain.enumeration.Qualification;
import io.jhipster.test1.domain.enumeration.RegimeExamen;
import io.jhipster.test1.domain.enumeration.Nature;

/**
 * A DTO for the Ue entity.
 */
public class UeDTO implements Serializable {

    private Long id;

    @NotNull
    private String nom;

    private TypeUe type;

    private Qualification qualif;

    private RegimeExamen regime;

    private Nature nature;

    private Long programmeId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public TypeUe getType() {
        return type;
    }

    public void setType(TypeUe type) {
        this.type = type;
    }

    public Qualification getQualif() {
        return qualif;
    }

    public void setQualif(Qualification qualif) {
        this.qualif = qualif;
    }

    public RegimeExamen getRegime() {
        return regime;
    }

    public void setRegime(RegimeExamen regime) {
        this.regime = regime;
    }

    public Nature getNature() {
        return nature;
    }

    public void setNature(Nature nature) {
        this.nature = nature;
    }

    public Long getProgrammeId() {
        return programmeId;
    }

    public void setProgrammeId(Long programmeId) {
        this.programmeId = programmeId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        UeDTO ueDTO = (UeDTO) o;
        if(ueDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), ueDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UeDTO{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", type='" + getType() + "'" +
            ", qualif='" + getQualif() + "'" +
            ", regime='" + getRegime() + "'" +
            ", nature='" + getNature() + "'" +
            "}";
    }
}
