package io.jhipster.test1.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Ee entity.
 */
public class EeDTO implements Serializable {

    private Long id;

    @NotNull
    private String nom;

    private Long ueId;

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

    public Long getUeId() {
        return ueId;
    }

    public void setUeId(Long ueId) {
        this.ueId = ueId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        EeDTO eeDTO = (EeDTO) o;
        if(eeDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), eeDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "EeDTO{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            "}";
    }
}
